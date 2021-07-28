class AddColumnToApply < ActiveRecord::Migration[6.1]
  def change
    add_column :applies, :note, :float  

  end
end
