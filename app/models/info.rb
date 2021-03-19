class Info < ApplicationRecord
    enum role: [ :male,:female ] 
    belongs_to :cv, class_name: "Cv", foreign_key: "cv_id"  
      


end
