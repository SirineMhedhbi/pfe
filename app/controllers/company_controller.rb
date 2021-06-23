class CompanyController < ApplicationController

    before_action :authenticate_api_user! ,except:[:index]



    
    def show
        if  !Company.where(id:params[:id]).present?
            render json: {message:"company not found"}
        else 
        @company  = Company.find(params[:id])
        render json: { company: @company}
        end
    end
   
    
    def userCompany
        @company= current_api_user.company
        render json: { company: @company}
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

     def updateCompany
        @company = current_api_user.company.update(company_params)
        render json: { company: @company}
     end
     def companylast
        @lastcompanies = Company.all.order(updated_at: :desc)
        render json: {lastcompanies: @lastcompanies.last(12)}
        
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
    params.require(:company).permit(:title,:category,:location, :linkedin, :github, :facebook, :instagram, :description, :gmail, :site, :twitter, :lat, :lng)
    end
    
end
  