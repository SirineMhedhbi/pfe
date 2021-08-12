class ApplyCandidatMailer < ApplicationMailer
    def send_mail
        @offer = params[:offer]

        mail(to: "sirine@gmail.com", subject: "your apply confirmation")
          
      
    end
    
end
