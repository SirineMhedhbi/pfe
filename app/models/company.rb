class Company < ApplicationRecord
    has_many :users, class_name: "User"
end
