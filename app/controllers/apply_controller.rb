class ApplyController < ApplicationController
    before_action :authenticate_api_user!



    def candidat_list
        
    #    search_params = params.require( :filter).permit!
    #    byebug

       @applies = Apply.where(offer_id: params[:id]) 
       if params[:filter].present?

          search_params = params.require( :filter).permit!
          @applies = @applies.where(status: search_params[:status]) if search_params[:status] != "all"
       end
       
       render json: @applies.to_json(
        :include => :user )
    end
    
    def accept_refuse
        @apply = Apply.find(params[:id])
        @apply.update(status: params[:status])
        render json: { apply: @apply,message:"status updated"}  
    end

    def my_applies
        @my_applies = Apply.where(user_id: current_api_user)
        render json: @my_applies, methods: :offer_title
        
    end
    def destroy
        @apply = Apply.find(params[:id])
        if @apply.present?
            @apply.destroy()
            render json: { message:"Apply deleted"}  
        else
            render json: { message:"Apply not found"}
        end
        
    end


    
end 