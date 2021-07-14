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

    def show
      @offer = Offer.find(params[:id])
      @offer_test= @offer.offer_test
      render json: @offer_test.to_json(
        :include => {:questions => {:include => :answers}} )
    end
    
  def add_question
    @offer_test = OfferTest.find(params[:id])
    q = question_params
    question = @offer_test.questions.create(question_content: q[:question])
    q[:reponses].each do |rep|
      answer = question.answers.create(rep)
      answer.save!
    end
    
    render json: question.to_json(
      :include => :answers )
  end

  


		def destroy
      @question  = Question.find(params[:id])
      @question.destroy
      render json: {message: "success destroy"}
		end
    def update_question
      @question  = Question.find(params[:id])
      @question.update(question_test_params)
      render json: {message: "success update"}
    end

    def update_answer
      @answer  = Answer.find(params[:id])
      @answer.update(question_test_params)
      render json: {message: "success update"}
    end
    
    def check_test
      @offer = Offer.find(params[:id])
     render json: {message: @offer.offer_test.present?}
    end

    def test_result
      candidat_answres = test_result_params
      note = 0
      test_result_params.each do |item|
        sended_answers = item[:answers]
        right_answers = Question.find(item[:question_id]).answers.where(is_true: true).pluck :id
        if sended_answers == right_answers
          note = note + 1
        end
      end
      final_note = note.to_f / candidat_answres.length.to_f * 100
      if final_note > 70 
        render json: {message: true}
      else
        render json: {message: false}
      end
    end
    
    
    private
    def test_params
			params.require(:test_offer).each do |item|
				item.permit!        
    	end

 		end
    def question_params
      params.require(:question).permit!
      
    end

    def question_test_params
      params.require(:test).permit!
    end
    def test_result_params
      params.require(:tab).each do |item|
				item.permit!        
    	end
    end
    
    
    
end 