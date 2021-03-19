class CvController < ApplicationController
    before_action :authenticate_api_user!
    def create 
        cv = Cv.create(cv_params)
        cv.save!
        render json: { Cv: cv, message: "cv created"} 
    end
    private
     def cv_params
      params.require(:cv).permit(:user_id)
     end

end
