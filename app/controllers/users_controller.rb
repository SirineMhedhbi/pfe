
class UsersController < ApplicationController
    before_action :authenticate_api_user!,except:[:indexlast,:linkedin_login]
    require 'net/http'
    require 'uri'
    def destroy
        if  !User.where(id:params[:id]).present?
            render json: {message:"user not found"}
        else 
        @user  = User.find(params[:id])
        @user.destroy
        render json: {message: "success destroy"}
        end
        
    end

    def update
        if  !User.where(id:params[:id]).present?
            render json: {message:"user not found"}
        else 
        @user  = User.find(params[:id])
        @user.update(user_params)
        if params[ :avatar ].present?
            @user.avatar.attach(data: params[ :avatar ])
		    @user.update(image: rails_blob_path(@user.avatar))
        end
        
        render json: { user: @user,message:"user updated"}  
        end

        
    end
    def index
        @users= User.candidat.all
        render json: { users: @users}
    end
    
    def companies
        @companies= User.Company.all
        render json: { companies: @companies}
    end
    def indexlast
        @lastusers = User.candidat.all.order(updated_at: :desc)
        render json: {lastusers: @lastusers.last(12)}
        
    end

    def show_user
     
        render json: { user: current_api_user.as_json(methods: :uploaded_cv_pdf)}
        
    end
    def upload_cv
        if current_api_user.uploaded_cv.attach(data: params[:cv])
            render json: { message: "Your CV uploaded successfully", cv: rails_blob_path(current_api_user.uploaded_cv)}  
        else
            render json: { message: "Sorry somthing went wrong"} 
        end
        
    end

    def linkedin_login
        
        uri = URI.parse("https://www.linkedin.com/oauth/v2/accessToken?grant_type=authorization_code&code=#{params["code"]}&redirect_uri=http://localhost:4200/login&client_id=77hd3hyl8mbich&client_secret=y6dgjM3IfUxpvu8b")
        request = Net::HTTP::Post.new(uri)

        req_options = {
        use_ssl: uri.scheme == "https",
        }

        response = Net::HTTP.start(uri.hostname, uri.port, req_options) do |http|
        http.request(request)
        end
        render json: response.body
        
    end
    
      private
     def user_params
      params.require(:user).permit(:email,:password, :role, :name, :nickname, :jobtitle, :phone, :address, :gender, :description, :post, :birthday, :lat,:lng, avatar: :data)
     end

end