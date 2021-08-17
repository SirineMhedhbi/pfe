class OfferController < ApplicationController
    before_action :authenticate_api_user! ,except:[:offer]

    def create
        
        offer = Offer.create(offer_params)
        
        offer.user=current_api_user
        offer.save!
        render json: { Offer: offer, user: current_api_user}
    end

    def index
        @offers = current_api_user.offers.to_json(:include => [:offer_test, :applies])
        render json: { offers: JSON(@offers), company: current_api_user.company }

    end

    def offer
        @offers = Offer.all
        render json: @offers, methods: :is_favorite_job
    end


    def recent_offers
        @new_offers = Offer.order(updated_at: :desc).last(8)
        @intern_offers = Offer.intern.order(updated_at: :desc).last(8)
        @fulltime_offers = Offer.full_time.order(updated_at: :desc).last(8)
        @parttime_offers = Offer.part_time.order(updated_at: :desc).last(8)
        render json: {   new_offers: @new_offers,
                         intern_offers: @intern_offers,
                         fulltime_offers: @fulltime_offers,
                         parttime_offers: @parttime_offers
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
        render json: @favorite_jobs, methods: :is_favorite_job
    end
 
    private
     def offer_params
      params.require(:offer).permit(:title, :category_id, :company_name, :location, :job_experience, :description, :job_salary, :job_time, :qualification, :contract, offerSkills: [])
     end

end