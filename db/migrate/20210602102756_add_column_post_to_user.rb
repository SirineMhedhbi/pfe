class AddColumnPostToUser < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :post, :string  

  end
end
