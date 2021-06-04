class DropColumnLink < ActiveRecord::Migration[6.1]
  def change
    remove_column :links, :company_id
  end
end
