class Cv < ApplicationRecord
    has_many :skills, class_name: "skill"
    has_many :educations, class_name: "Education"
    has_many :infos, class_name: "info"
    has_many :links, class_name: "link"

    has_one :user


    


end
