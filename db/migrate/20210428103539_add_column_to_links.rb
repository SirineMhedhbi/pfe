class AddColumnToLinks < ActiveRecord::Migration[6.1]
  def change
    add_column :links, :github, :string  

  end
end
