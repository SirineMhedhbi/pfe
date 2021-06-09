class Cv < ApplicationRecord
    has_many :skills, class_name: "Skill"
    has_many :educations, class_name: "Education"
    has_many :infos, class_name: "Info"
    has_many :links, class_name: "Link"
    has_many :works, class_name: "Work"


    has_one :user


    


end
