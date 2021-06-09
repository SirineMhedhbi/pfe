class AddColumnsToOffer < ActiveRecord::Migration[6.1]
  def change
    add_column :offers, :contract, :string  
    add_column :offers, :required_skills, :string, array: true, default: []
    rename_column :offers, :job_level, :qualification
    #Ex:- rename_column("admin_users", "pasword","hashed_pasword")
  end
end
