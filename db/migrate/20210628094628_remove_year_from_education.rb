class RemoveYearFromEducation < ActiveRecord::Migration[6.1]
  def change
    remove_column :educations, :year

  end
end
