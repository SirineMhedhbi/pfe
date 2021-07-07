class HobbiesController < ApplicationController
    before_action :authenticate_api_user!
    def create
        hobbie = Hobbie.create(hobbie_params)
        hobbie.cv = current_api_user.cv
        hobbie.save!
        render json: { hobbie: hobbie, user: current_api_user}
    end

    def index
        @hobbies= current_api_user.cv.hobbies
        render json: { hobbies: @hobbies}

    end
     
    

    def update
        if  !Hobbie.where(id:params[:id]).present?
            render json: {message:"hobbie not found"}
        else 
        @hobbie  = Hobbie.find(params[:id])
        @hobbie.update(hobbie_params)
        render json: { hobbie: @hobbie,message:"hobbie updated"}  
        end
    end

    def destroy
        if  !Hobbie.where(id:params[:id]).present?
            render json: {message:"hobbie not found"}
        else 
        @hobbie  = Hobbie.find(params[:id])
        @hobbie.destroy
        render json: {message: "success destroy"}
        end
    end
    private
     def hobbie_params
      params.require(:hobby).permit!
     end

end 
    