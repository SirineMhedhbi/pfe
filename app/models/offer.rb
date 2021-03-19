class Offer < ApplicationRecord
enum job_experience: [ :junior, :senior ] 
belongs_to :user, class_name: "User", foreign_key: "user_id"    
end
