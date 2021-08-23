class OfferController < ApplicationController
    before_action :authenticate_api_user! ,except:[:offer,:recent_offers]

    def create
        
        offer = Offer.create(offer_params)
        
        offer.user=current_api_user
        offer.save!
        render json: { Offer: offer, user: current_api_user}
    end

    def index
        @offers = current_api_user.offers
        if params["query"] != "null"
            q = JSON.parse(params["query"])
            if q["title"] != ""
                @offers = @offers.where("title LIKE ?", "%#{ q["title"] }%" )
            end
            if q["category"] != -1
                @offers = @offers.where(category_id: q["category"])
            end
            if q["lng"] != "" && q["lat"] != ""
                @offers = @offers.within(10, :origin => [q["lat"], q["lng"]]) 
            end
            
        end
        render json:  @offers, methods:[ :current_user_company , :offer_test, :applies]

    end

    def offer
        @offers = Offer.all
        if params["query"] != "null"
            q = JSON.parse(params["query"])
            if q["title"] != ""
                @offers = @offers.where("title LIKE ?", "%#{ q["title"] }%" )
            end
            if q["category"] != -1
                @offers = @offers.where(category_id: q["category"])
            end
            if q["lng"] != "" && q["lat"] != ""
                @offers = @offers.within(10, :origin => [q["lat"], q["lng"]]) 
            end
            
        end
        render json: @offers, methods: [:is_favorite_job , :offer_company]
    end


    def recent_offers
        @new_offers = Offer.order(updated_at: :desc).last(8)
        @intern_offers = Offer.intern.order(updated_at: :desc).last(8)
        @fulltime_offers = Offer.full_time.order(updated_at: :desc).last(8)
        @parttime_offers = Offer.part_time.order(updated_at: :desc).last(8)
        

                    render json: {   new_offers: @new_offers.as_json(methods: :offer_company),
                        intern_offers: @intern_offers.as_json(methods: :offer_company),
                        fulltime_offers: @fulltime_offers.as_json(methods: :offer_company),
                        parttime_offers: @parttime_offers.as_json(methods: :offer_company)
                   }  
     


    end
    

    def update
        
        if  !Offer.where(id:params[:id]).present?
            render json: {message:"offer not found"}
        else 
        @offer  = Offer.find(params[:id])
        @offer.update(offer_params)
        render json: { offer: @offer,message:"offer updated"}  
        end
    end

    def destroy
        if  !Offer.where(id:params[:id]).present?
            render json: {message:"offer not found"}
        else 
        @offer  = Offer.find(params[:id])
        @offer.destroy
        render json: {message: "success destroy"}
        end
    end

    def show
        if  !Offer.where(id:params[:id]).present?
            render json: {message:"offer not found"}
        else 
            @offer = Offer.find(params[:id])
            render json: @offer, :include => {:user => {:only => [:phone ,:address, :email]}}, methods: :already_applied
            
        end 
    end

    def add_remove_favorite
        if params["answer"]
            FavoriteJob.create(offer_id: params["id"], user_id: current_api_user.id)
            render json: {message:"Job post added to your favorite jobs"}
        else
            FavoriteJob.where(offer_id: params["id"], user_id: current_api_user.id).first.delete()
            render json: {message:"Job post removed to your favorite jobs"}  
        end
    end
    def favorite_jobs
        offers_ids = FavoriteJob.where(user_id: current_api_user.id).pluck :offer_id
        @favorite_jobs = Offer.where(id: offers_ids )
        if params["query"] != "null"
            q = JSON.parse(params["query"])
            if q["title"] != ""
                @favorite_jobs = @favorite_jobs.where("title LIKE ?", "%#{ q["title"] }%" )
            end
            if q["category"] != -1
                @favorite_jobs = @favorite_jobs.where(category_id: q["category"])
            end
            if q["lng"] != "" && q["lat"] != ""
                @favorite_jobs = @favorite_jobs.within(10, :origin => [q["lat"], q["lng"]]) 
            end
            
        end
        render json: @favorite_jobs, methods: [:is_favorite_job, :offer_company]
    end
 
    private
     def offer_params
      params.require(:offer).permit(:title, :category_id, :company_name, :location, :job_experience, :description, :job_salary, :job_time, :qualification, :lat, :lng, :contract, offerSkills: [])
     end

end