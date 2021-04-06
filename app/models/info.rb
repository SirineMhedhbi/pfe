class Info < ApplicationRecord
    enum gender: [ :male,:female ] 
    belongs_to :cv, class_name: "Cv", foreign_key: "cv_id"  
      


end
