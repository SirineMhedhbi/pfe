class CreateFavoriteJobs < ActiveRecord::Migration[6.1]
  def change
    create_table :favorite_jobs do |t|

      t.timestamps
    end
    add_column :favorite_jobs, :offer_id, :integer
    add_foreign_key :favorite_jobs, :offers, column: :offer_id
    add_column :favorite_jobs, :user_id, :integer
    add_foreign_key :favorite_jobs, :users, column: :user_id
  end

end
