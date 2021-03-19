class OfferController < ApplicationController
    before_action :authenticate_api_user!


    def create
        offer = Offer.create(offer_params)
        offer.save!
        render json: { Offer: offer, user: current_api_user}
    end

    def index
        @offers= Offer.all
        render json: { offers: @offers}

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
        render json: { offer: @offer}
        end 
    end
 
    private
     def offer_params
      params.require(:offer).permit(:title, :category, :name, :location, :offer_type, :user_id, :job_experience, :job_level, :job_salary, :job_qualification)
     end

end