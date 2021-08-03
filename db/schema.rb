# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_07_28_134108) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "hstore"
  enable_extension "plpgsql"
  enable_extension "uuid-ossp"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "answers", force: :cascade do |t|
    t.text "answer_content"
    t.boolean "is_true"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "question_id"
  end

  create_table "applies", force: :cascade do |t|
    t.integer "status"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "offer_id"
    t.integer "user_id"
    t.float "note"
  end

  create_table "companies", force: :cascade do |t|
    t.string "title"
    t.string "category"
    t.string "name"
    t.string "location"
    t.string "type"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "github"
    t.string "linkedin"
    t.string "facebook"
    t.string "instagram"
    t.string "gmail"
    t.string "site"
    t.string "twitter"
    t.string "lat"
    t.string "lng"
  end

  create_table "cvs", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
  end

  create_table "educations", force: :cascade do |t|
    t.string "title"
    t.string "degree"
    t.string "institute"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "cv_id"
    t.date "begin_date"
    t.date "end_date"
  end

  create_table "hobbies", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "cv_id"
  end

  create_table "infos", force: :cascade do |t|
    t.string "name"
    t.string "email"
    t.date "date_of_birth"
    t.string "phone"
    t.string "address"
    t.string "job_title"
    t.integer "gender"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "cv_id"
  end

  create_table "links", force: :cascade do |t|
    t.string "facebook"
    t.string "linkedin"
    t.string "instagram"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "cv_id"
    t.string "github"
  end

  create_table "offer_tests", force: :cascade do |t|
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "offer_id"
  end

  create_table "offers", force: :cascade do |t|
    t.string "title"
    t.string "category"
    t.string "company_name"
    t.string "location"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "user_id"
    t.integer "job_salary"
    t.integer "job_experience"
    t.integer "job_time"
    t.string "qualification"
    t.string "contract"
    t.string "offerSkills", default: [], array: true
  end

  create_table "questions", force: :cascade do |t|
    t.text "question_content"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "offer_test_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "title"
    t.string "name"
    t.integer "pourcentage"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "cv_id"
  end

  create_table "test_attempts", force: :cascade do |t|
    t.integer "count"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "offer_test_id"
    t.integer "user_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "provider", default: "email", null: false
    t.string "uid", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.boolean "allow_password_change", default: false
    t.datetime "remember_created_at"
    t.string "confirmation_token"
    t.datetime "confirmed_at"
    t.datetime "confirmation_sent_at"
    t.string "unconfirmed_email"
    t.string "name"
    t.string "nickname"
    t.string "image"
    t.string "email"
    t.json "tokens"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "sign_in_count", default: 0, null: false
    t.datetime "current_sign_in_at"
    t.datetime "last_sign_in_at"
    t.inet "current_sign_in_ip"
    t.inet "last_sign_in_ip"
    t.integer "company_id"
    t.integer "role"
    t.string "jobtitle"
    t.string "phone"
    t.date "birthday"
    t.string "address"
    t.string "gender"
    t.string "description"
    t.string "post"
    t.string "lat"
    t.string "lng"
    t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
    t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
  end

  create_table "works", force: :cascade do |t|
    t.string "title"
    t.date "begin_date"
    t.date "end_date"
    t.string "company"
    t.string "description"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.integer "cv_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "answers", "questions"
  add_foreign_key "applies", "offers"
  add_foreign_key "applies", "users"
  add_foreign_key "cvs", "users"
  add_foreign_key "educations", "cvs"
  add_foreign_key "hobbies", "cvs"
  add_foreign_key "infos", "cvs"
  add_foreign_key "links", "cvs"
  add_foreign_key "offer_tests", "offers"
  add_foreign_key "offers", "users"
  add_foreign_key "questions", "offer_tests"
  add_foreign_key "skills", "cvs"
  add_foreign_key "test_attempts", "offer_tests"
  add_foreign_key "test_attempts", "users"
  add_foreign_key "users", "companies"
  add_foreign_key "works", "cvs"
end
