class CompanyController < ApplicationController

    before_action :authenticate_api_user!



    
    def show
        if  !Company.where(id:params[:id]).present?
            render json: {message:"company not found"}
        else 
        @Company  = Company.find(params[:id])
        render json: { Company: @Company}
        end
    end


    def index  
        @companies= Company.all
        render json: { companies: @companies}

      end

    def create
        company= Company.create(company_params)
        render json: { Company: company, user: current_api_user}
     end

     def destroy
        if  !Company.where(id:params[:id]).present?
            render json: {message:"company not found"}
        else 
        @Company  = Company.find(params[:id])
        @Company.destroy
        render json: {message: "success destroy"}
        end
     end
     
 
    def update
        if  !Company.where(id:params[:id]).present?
            render json: {message:"company not found"}
        else 
        @Company  = Company.find(params[:id])
        @Company.update(company_params)
        render json: { Company: @Company,message:"company updated"}  
        end

    

    end

    private
    def company_params
    params.require(:company).permit(:title,:category,:location)
    end
    
end
  