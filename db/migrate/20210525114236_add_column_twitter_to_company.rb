class AddColumnTwitterToCompany < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :twitter, :string

  end
end
