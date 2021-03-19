class InfoController < ApplicationController
    before_action :authenticate_api_user!

    def create
        info = Info.create(info_params)
        info.save!
        render json: { Info: info, user: current_api_user} 
    end


    private
    def info_params
     params.require(:info).permit(:name, :email, :date_of_birth, :phone, :address, :job_title, :gender, :description, :cv_id)
    end

end