class Offer < ApplicationRecord
    enum job_experience: [ :junior, :senior ]
    belongs_to :user, class_name: "User", foreign_key: "user_id"
    enum job_time: [:full_time, :part_time, :intern]
    has_one :offer_test
    has_many :applies

end
