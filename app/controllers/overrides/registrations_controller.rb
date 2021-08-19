module Overrides
	class RegistrationsController < DeviseTokenAuth::RegistrationsController
		#skip_before_action :authenticate_api_user!
		def create
		#   @resource = User.new(user_params)
		#    #This may vary based on your params and conditions you want7
			super
			@resource.avatar.attach(data: params[ :avatar ])
			@resource.update(image: rails_blob_path(@resource.avatar))
			if @resource.role == "candidat"
					cv = Cv.create
					@resource.cv = cv
					@resource.save
					@resource.uploaded_cv.attach(data: params[ :uploaded_cv ])
			end
		end
		# private
		# def user_params
		# 		params.require(:registration).permit(:email,:password, :role, :name, :nickname, :jobtitle, :phone, :address, :gender, :birthday, :company_id, :description, :post)
		# end
	end

end

