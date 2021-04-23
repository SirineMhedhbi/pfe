class EducationsController < ApplicationController
    before_action :authenticate_api_user!


    def create
        education = Education.create(education_params)
        education.cv = current_api_user.cv
        education.save!
        render json: { education: education, user: current_api_user}
    end

    def index
        @educations= current_api_user.cv.educations
        render json: { educations: @educations}

    end

    def update
        if  !Education.where(id:params[:id]).present?
            render json: {message:"education not found"}
        else 
        @education  = Education.find(params[:id])
        @education.update(education_params)
        render json: { education: @education,message:"education updated"}  
        end
    end

    def destroy
        if  !Education.where(id:params[:id]).present?
            render json: {message:"education not found"}
        else 
        @education  = Education.find(params[:id])
        @education.destroy
        render json: {message: "success destroy"}
        end
    end

    # def show
    #     if  !education.where(id:params[:id]).present?
    #         render json: {message:"education not found"}
    #     else 
    #     @education = education.find(params[:id])
    #     render json: { education: @education}
    #     end 
    # end
 
    private
     def education_params
      params.require(:education).permit(:title, :degree, :institute, :year)
     end

end