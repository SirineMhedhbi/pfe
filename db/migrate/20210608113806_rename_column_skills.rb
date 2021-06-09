class RenameColumnSkills < ActiveRecord::Migration[6.1]
  def change
    rename_column :offers, :required_skills, :offer_skills

  end
end
