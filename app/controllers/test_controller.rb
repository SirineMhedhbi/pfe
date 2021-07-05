class TestController < ApplicationController
    before_action :authenticate_api_user!
    def validate
        offer = Offer.find(params[:id])
        offer_test = test_params
        @offer_test = OfferTest.create 
        offer_test.each do |ques|
            
            question = @offer_test.questions.create(question_content: ques[:question])
            
            ques[:reponses].each do |rep|
                answer = question.answers.create(rep)
                answer.save!
            end
            question.save!

        end
				@offer_test.save!
				offer.offer_test = 	@offer_test
				offer.save!

        
    end
		def destroy
			
		end
		

    private
    def test_params
        
			params.require(:test_offer).each do |item|
				item.permit!        
    	end

 		end
    
end 