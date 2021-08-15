class CategoriesController < ApplicationController
	include ActionController::Serialization


    def index
        @categories = Category.all
        render json: @categories, include: 'avatar'
    end
end
