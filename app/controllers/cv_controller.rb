class CvController < ApplicationController
    before_action :authenticate_api_user! ,except:[:cvUser]
        def create 
            cv = Cv.create(cv_params)
            cv.save!
            render json: { Cv: cv, message: "cv created"} 
        end


        def cvUser

            @user = User.find(params[:id])
            @educations= @user.cv&.educations
            @skills= @user.cv&.skills
            @links= @user.cv&.links
            @works= @user.cv&.works
            @hobbies= @user.cv&.hobbies





            render json: { educations: @educations, user: @user, skills: @skills, links: @links, works: @works, hobbies: @hobbies}

        end
    private
        def cv_params
        params.require(:cv).permit(:user_id)
        end
       

end
