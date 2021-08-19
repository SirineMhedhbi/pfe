class ApplicationController < ActionController::API
	include DeviseTokenAuth::Concerns::SetUserByToken
	include ActionController::ImplicitRender
	include ActiveStorageSupport::SupportForBase64
	include Rails.application.routes.url_helpers


	before_action :configure_permitted_parameters, if: :devise_controller?

	before_action :set_current_user
    def set_current_user
      User.current = current_api_user
    end
	protected
	def configure_permitted_parameters
		devise_parameter_sanitizer.permit(:sign_up, keys: [:role, :name, :nickname, :jobtitle, :phone, :address, :gender, :birthday, :company_id, :description, :post, avatar: :data, uploaded_cv: :data])
	end


end
