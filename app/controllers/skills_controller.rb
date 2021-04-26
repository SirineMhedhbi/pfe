class SkillsController < ApplicationController
    before_action :authenticate_api_user!


    def create
        
        skill = Skill.create(skill_params)
        skill.cv = current_api_user.cv
        skill.save!
        render json: { skill: skill, user: current_api_user}
    end

    def index
        @skills= current_api_user.cv.skills
        render json: { skills: @skills}

    end

    def update
        if  !Skill.where(id:params[:id]).present?
            render json: {message:"skill not found"}
        else 
        @skill  = Skill.find(params[:id])
        @skill.update(skill_params)
        render json: { skill: @skill,message:"skill updated"}  
        end
    end

    def destroy
        if  !Skill.where(id:params[:id]).present?
            render json: {message:"skill not found"}
        else 
        @skill  = Skill.find(params[:id])
        @skill.destroy
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
     def skill_params
      params.require(:skill).permit(:name, :pourcentage)
     end

end