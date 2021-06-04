class AddColumnToCompany < ActiveRecord::Migration[6.1]
  def change
    add_column :companies, :gmail, :string
    add_column :companies, :site, :string

  end
end
