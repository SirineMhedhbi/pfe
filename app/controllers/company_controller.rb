class CompanyController < ApplicationController

    before_action :authenticate_api_user! ,except:[:index]



    
    def show
        if  !Company.where(id:params[:id]).present?
            render json: {message:"company not found"}
        else 
        @company  = Company.find(params[:id])
        render json: @company
        end
    end
   
    
    def userCompany
        @company= current_api_user.company
        render json:  @company
    end


    def index  
        @companies= Company.all
        render json:  @companies

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
        if params[ :avatar ].present?
            current_api_user.company.avatar.attach(data: params[ :avatar ])
		    # current_api_user.company.update(image: rails_blob_path(@company.avatar))
        end
        render json: { company: @company}
     end
     def companylast
        @lastcompanies = Company.all.order(updated_at: :desc)
        render json: @lastcompanies.last(12)
        
    end
     
 
    def update
        if  !Company.where(id:params[:id]).present?
            render json: {message:"company not found"}
        else 
        @Company  = Company.find(params[:id])
        @Company.update(company_params)
        if params[ :avatar ].present?
            @Company.avatar.attach(data: params[ :avatar ])
		    @Company.update(image: rails_blob_path(@Company.avatar))
        end
        render json: { Company: @Company,message:"company updated"}  
        end
    end

    private
    def company_params
    params.require(:company).permit(:title,:category,:location, :linkedin, :github, :facebook, :instagram, :description, :gmail, :site, :twitter, :lat, :lng, avatar: :data)
    end
    
end
  