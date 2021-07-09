class ApplicationController < ActionController::API
	include DeviseTokenAuth::Concerns::SetUserByToken
	include ActionController::ImplicitRender
	include ActiveStorageSupport::SupportForBase64

	before_action :configure_permitted_parameters, if: :devise_controller?


	protected
	def configure_permitted_parameters
		devise_parameter_sanitizer.permit(:sign_up, keys: [:role, :name, :nickname, :jobtitle, :phone, :address, :gender, :birthday, :company_id, :description, :post, avatar: :data])
	end


end
