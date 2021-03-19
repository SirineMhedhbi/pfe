class RenameColumnType < ActiveRecord::Migration[6.1]
  def change
    rename_column :offers, :type, :offer_type
  end
end
