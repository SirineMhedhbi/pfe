class LinksController < ApplicationController
    before_action :authenticate_api_user!
    
    def create
        if link_params[:id]==0
            link = Link.create(link_params)
            link.cv = current_api_user.cv
            link.save! 
        
        else
        link  = Link.find(link_params[:id])
        link.update(link_params)
        end
        render json: { link: link, user: current_api_user}
    end

    def index
        @links= current_api_user.cv.links.first
        render json: { link: @links}

    end

    def update
        if  !link.where(id:params[:id]).present?
            render json: {message:"link not found"}
        else 
        @link  = Link.find(params[:id])
        @link.update(link_params)
        render json: { link: @link,message:"link updated"}  
        end
    end

    def destroy
        if  !Link.where(id:params[:id]).present?
            render json: {message:"link not found"}
        else 
        @link  = Link.find(params[:id])
        @link.destroy
        render json: {message: "success destroy"}
        end
    end



    private
    def link_params
     params.require(:link).permit(:linkedin, :facebook, :instagram, :github, :id)
    end

end