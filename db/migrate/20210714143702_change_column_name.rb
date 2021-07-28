class ChangeColumnName < ActiveRecord::Migration[6.1]
  def change
    rename_column :test_attempts, :name, :count

  end
end
