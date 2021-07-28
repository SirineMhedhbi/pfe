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
      apply = Apply.where(user_id: current_api_user.id, offer_id: @offer.id).first
      if @offer.offer_test.present?
        ta = TestAttempt.where(offer_test_id: @offer.offer_test.id, user_id: current_api_user.id).first
        if  apply.present?
          render json: {message:"You have already applied to this job", success: false }
        elsif ta.present? && ta.count > 2
          render json: {message:"You have already passed a test for this job and you failed, sorry", success: false }
        else
          render json: {message:"okay", success: true }
        end
      else
        if apply.present?
          render json: {message:"You have already applied to this job", success: false }
        else
          Apply.create(offer_id: @offer.id, user_id: current_api_user.id, status: 0)
          render json: {message:"Your apply has been registred successfully, in 24 hours the job post owner will contact you", success: false }
        end
      end
    end

    def test_result
      ta = create_or_update_test_attempt(params[:test_id])
      if ta.count > 2
        render json: {message: "You have already finish your 3 attempts", success: false, redirect: true}
      else
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
          Apply.create(offer_id: OfferTest.find(params[:test_id]).offer.id, user_id: current_api_user.id, status: 0, note: final_note)
          render json: {message: "Congratulation you have passed the test, in 24 hours the job post owner will contact you", success: true}
        else
          render json: {message: "Sorry your score is under 70% you have #{3 - (ta.count + 1)} attempt(s) left", success: false }
        end
      end
    end


    private

    def create_or_update_test_attempt(test_id)
      ta = TestAttempt.where(offer_test_id: test_id, user_id: current_api_user.id).first
      if ta.present?
        ta.update(count: ta.count.to_i + 1)
      else
        ta = TestAttempt.create(offer_test_id: test_id, user_id: current_api_user.id, count: 0)
      end
      return ta
    end

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