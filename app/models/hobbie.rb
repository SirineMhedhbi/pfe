class Hobbie < ApplicationRecord
    belongs_to :cv, class_name: "Cv", foreign_key: "cv_id" , optional: :true

end
