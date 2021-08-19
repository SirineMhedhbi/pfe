require 'pdfkit'
class UsersController < ApplicationController
    before_action :authenticate_api_user!,except:[:download_cv]


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

    def show
      
        render json: { user: current_api_user}
    end
    def download_cv
        
        html='<html>
        <head>
        <style>
        h3{color:red;}
        </style>
        </head>
        <body>
        
        <div _ngcontent-cmt-c183="" class="row align-items-center"><div _ngcontent-cmt-c183="" class="col-lg-5"><div _ngcontent-cmt-c183="" class="single-profile-item"><img _ngcontent-cmt-c183="" alt="Profile" class="offset-lg-2 ui medium circular image" style="height: 285px;" src="http://localhost:3000/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBCZz09IiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--0a2d6e51846addaf33f6092428b252b580218c0e/1628777255"><div _ngcontent-cmt-c183="" class="single-profile-left"><div _ngcontent-cmt-c183="" class="single-profile-contact"><h3 _ngcontent-cmt-c183="">Contact Info</h3><ul _ngcontent-cmt-c183=""><li _ngcontent-cmt-c183=""><i _ngcontent-cmt-c183="" class="icofont-ui-call"></i><a _ngcontent-cmt-c183="" href="tel:+07554332322">0123456789</a></li><li _ngcontent-cmt-c183=""><i _ngcontent-cmt-c183="" class="icofont-email"></i><a _ngcontent-cmt-c183="" href="mailto:hello@peof.com">seddin178@gmail.com</a></li><li _ngcontent-cmt-c183=""><i _ngcontent-cmt-c183="" class="icofont-location-pin"></i> Seattle, WA, USA</li></ul></div><div _ngcontent-cmt-c183="" class="single-profile-social"><h3 _ngcontent-cmt-c183="">Social Links</h3><ul _ngcontent-cmt-c183=""><li _ngcontent-cmt-c183=""><i _ngcontent-cmt-c183="" class="icofont-facebook"></i><a _ngcontent-cmt-c183="" href="#" target="_blank">facebook</a></li><li _ngcontent-cmt-c183=""><i _ngcontent-cmt-c183="" class="icofont-instagram"></i><a _ngcontent-cmt-c183="" href="#" target="_blank">insta</a></li><li _ngcontent-cmt-c183=""><i _ngcontent-cmt-c183="" class="icofont-linkedin"></i><a _ngcontent-cmt-c183="" href="#" target="_blank">linkedin</a></li><li _ngcontent-cmt-c183=""><i _ngcontent-cmt-c183="" class="icofont-twitter"></i><a _ngcontent-cmt-c183="" href="#" target="_blank">github</a></li></ul></div><div _ngcontent-cmt-c183="" class="single-profile-skills"><h3 _ngcontent-cmt-c183="">My Skills</h3><div _ngcontent-cmt-c183="" class="skill"><p _ngcontent-cmt-c183="">ruby</p><div _ngcontent-cmt-c183="" class="skill-bar skill1 skill3 wow slideInLeft animated" style="visibility: hidden; animation-name: none;"><span _ngcontent-cmt-c183="" class="skill-count1">80%</span></div></div><div _ngcontent-cmt-c183="" class="skill"><p _ngcontent-cmt-c183="">java</p><div _ngcontent-cmt-c183="" class="skill-bar skill1 skill3 wow slideInLeft animated" style="visibility: hidden; animation-name: none;"><span _ngcontent-cmt-c183="" class="skill-count1">86%</span></div></div><!--bindings={

        
        </body>
        </html>        '
        pdf = WickedPdf.new.pdf_from_string(html)
        save_path = Rails.root.join('pdfs','filename.pdf')
        File.open("#{Rails.root}/test.pdf", 'wb') do |file|
        file << pdf
        
        send_file(file.path , disposition: 'attachment' )

        end

        
    end
    
      private
     def user_params
      params.require(:user).permit(:email,:password, :role, :name, :nickname, :jobtitle, :phone, :address, :gender, :description, :post, :birthday, :lat,:lng, avatar: :data)
     end

end