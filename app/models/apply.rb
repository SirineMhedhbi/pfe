class Apply < ApplicationRecord
    belongs_to :offer, class_name: "Offer", foreign_key: "offer_id"
    belongs_to :user, class_name: "User", foreign_key: "user_id"
    enum status: [ :pending, :rejected, :accepted ]
    #todo send email to owner of offer after create an apply 

end
