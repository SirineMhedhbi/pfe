class WorksController < ApplicationController
    before_action :authenticate_api_user! 


    def create
        work = Work.create(works_params)
        work.cv = current_api_user.cv
        work.save!
        render json: { work: work, user: current_api_user}
    end
    def index
        @works= current_api_user.cv.works
        render json: { works: @works}

    end
    def update
        if  !Work.where(id:params[:id]).present?
            render json: {message:"work not found"}
        else 
        @work  = Work.find(params[:id])
        @work.update(works_params)
        render json: { work: @work,message:"work updated"}  
        end
    end

    def destroy
        if  !Work.where(id:params[:id]).present?
            render json: {message:"work not found"}
        else 
        @work  = Work.find(params[:id])
        @work.destroy
        render json: {message: "success destroy"}
        end
    end


    private
    def works_params
     params.require(:work).permit(:title, :begin_date, :end_date, :company, :description)
    end
end 