class RenameColumnSkillsoffer < ActiveRecord::Migration[6.1]
  def change
    rename_column :offers, :offer_skills, :offerSkills
  end
end
