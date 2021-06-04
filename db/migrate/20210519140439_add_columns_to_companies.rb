class AddColumnsToCompanies < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :github, :string  
    add_column :companies, :linkedin, :string  
    add_column :companies, :facebook, :string  
    add_column :companies, :instagram, :string  

  end
end
