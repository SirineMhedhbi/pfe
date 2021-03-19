module Overrides
    class RegistrationsController < DeviseTokenAuth::RegistrationsController
        #skip_before_action :authenticate_api_user!
     def create
      
      @resource = User.new(user_params) #This may vary based on your params and conditions you want
      unless @resource.save
       render json: { message: @resource.errors.full_messages.join(', ') }, status: :bad_request
       return
      end
      @token = @resource.create_token
      @resource.save
      update_auth_header
      render_create_success
     end
     private
     def user_params
      params.require(:registration).permit(:email,:password, :role, :name, :nickname, :jobtitle, :phone, :address, :gender)
     end
    end

end

