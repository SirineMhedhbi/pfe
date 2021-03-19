class FixeUserCv < ActiveRecord::Migration[6.1]
  def change
    remove_column :users, :cv_id
  end
end
