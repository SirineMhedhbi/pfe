class AddColumnToEducation < ActiveRecord::Migration[6.1]
  def change
    add_column :educations, :begin_date, :date
    add_column :educations, :end_date, :date
  end
end
