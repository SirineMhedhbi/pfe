class CategoriesController < ApplicationController
	include ActionController::Serialization


    def index
        @categories= Category.all
        render json: @categories
    end
end
