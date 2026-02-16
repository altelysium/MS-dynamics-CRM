<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProfileStore } from "../stores/profileStore";
import { computed, onMounted, ref } from "vue";
import type {
  ContactInfoKeys,
  HeaderData,
  KeyValueRow,
  PersonalDataKeys,
  InsuranceInfoKeys,
  AppointmentsKeys,
  Product,
  FeedbackKeys,
  Review,
  ActivitiesDataKeys,
} from "../types/profileTypes";
import ProfileCard from "../components/ProfileCard.vue";
import ProfileCardInfo from "../components/profileCardContent/ProfileCardInfo.vue";
import ProfileCardSheet from "../components/profileCardContent/ProfileCardSheet.vue";
import ProfileCardListComponent from "../components/profileCardContent/ProfileCardListComponent.vue";

const profileStore = useProfileStore();
const { selectedUserId, fetchedProfileData, fetchedProductsData, fetchedSingleProductData } =
  storeToRefs(profileStore);

const headerData = computed((): HeaderData => {
  return {
    imageSource: fetchedProfileData.value ? fetchedProfileData.value.image : "",
    fullName: `${fetchedProfileData.value?.firstName} ${fetchedProfileData.value?.lastName}`,
    department: fetchedProfileData.value ? fetchedProfileData.value.company.department : "",
  };
});

const contactInfoData = computed((): Record<ContactInfoKeys, KeyValueRow> => {
  return {
    fullName: {
      key: "Full Name",
      value: `${fetchedProfileData.value?.firstName} ${fetchedProfileData.value?.lastName}`,
    },
    phone: {
      key: "Phone",
      value: fetchedProfileData.value ? fetchedProfileData.value?.phone : "",
    },
    homePhone: {
      key: "Home phone",
      value: "-",
    },
    address: {
      key: "Address",
      value: fetchedProfileData.value ? fetchedProfileData.value?.address.address : "",
    },
    email: {
      key: "Email",
      value: fetchedProfileData.value ? fetchedProfileData.value?.email : "",
    },
  };
});
const personalData = computed((): Record<PersonalDataKeys, KeyValueRow> => {
  return {
    gender: {
      key: "Gender",
      value: fetchedProfileData.value ? fetchedProfileData.value?.gender : "",
    },
    birth: {
      key: "Birth (Age)",
      value: fetchedProfileData.value ? fetchedProfileData.value?.birthDate : "",
    },
    id: {
      key: "ID",
      value: fetchedProfileData.value ? fetchedProfileData.value?.id : "",
    },
    nationality: {
      key: "Nationality",
      value: fetchedProfileData.value ? fetchedProfileData.value?.address.country : "",
    },
    materialStatus: {
      key: "Material Status",
      value: fetchedProfileData.value?.maidenName ? "Married" : "Not married",
    },
    emergencyContact: {
      key: "Emergency Contact",
      value: fetchedProfileData.value ? fetchedProfileData.value?.bank.cardNumber : "",
    },
  };
});
const activitiesData = computed((): ActivitiesDataKeys[] => {
  const dataArray: ActivitiesDataKeys[] = [];
  fetchedProductsData.value?.products.forEach((item: Product) => {
    const date: string = item.meta.updatedAt.slice(0, 10);
    dataArray.push({
      title: item.title,
      description: `by ${item.brand}`,
      date: date,
    });
  });
  return dataArray;
});
const insuranceInfoData = computed((): Record<InsuranceInfoKeys, KeyValueRow> => {
  return {
    memberId: {
      key: "Member ID",
      value: fetchedProfileData.value ? fetchedProfileData.value?.bank.cardNumber : "",
    },
    provider: {
      key: "Provider",
      value: fetchedProfileData.value ? fetchedProfileData.value?.company.name : "",
    },
  };
});
const appointmentsData = computed((): Record<AppointmentsKeys, string>[] => {
  const dataArray: Record<AppointmentsKeys, string>[] = [];
  fetchedProductsData.value?.products.forEach((item: Product) => {
    const date: string = `${item.meta.updatedAt.slice(0, 10).split("-").reverse().join("-")}${item.meta.updatedAt.slice(11, 16)} AM`;
    dataArray.push({
      date: date,
      speciality: item.category,
      status: item.stock % 2 ? "Confirmed" : "Cancelled",
    });
  });
  return dataArray;
});
const feedbackData = computed((): Record<FeedbackKeys, string>[] => {
  const dataArray: Record<FeedbackKeys, string>[] = [];
  fetchedSingleProductData.value?.reviews?.forEach((item: Review) => {
    const date: string = `${item.date.slice(0, 10).split("-").reverse().join("-")}`;
    dataArray.push({
      feedbackTitle: item.reviewerName,
      feedbackDate: date,
      feedbackStatus: String(item.rating),
    });
  });
  return dataArray;
});

const contactMethodData = ref([
  { contactMethod: "Email" },
  { contactMethod: "Mobile phone" },
  { contactMethod: "Mail" },
])

onMounted(() => {
  profileStore.getProfileData(selectedUserId.value);
  profileStore.getProducts();
  profileStore.getProductReviews(selectedUserId.value);
});
</script>

<template>
  <section class="user-page">
    <header class="user-header">
      <img class="user-header__img" :src="headerData.imageSource" :alt="headerData.fullName" />
      <div class="user-header-info">
        <p class="user-header-info__title">{{ headerData.fullName }}</p>
        <p class="user-header-info__description">{{ headerData.department }}</p>
      </div>
    </header>
    <div class="user-body">
      <ProfileCard title="Contact info" card-type="info" modification="editable">
        <ProfileCardInfo :data="contactInfoData" />
      </ProfileCard>
      <ProfileCard title="Personal" card-type="info">
        <ProfileCardInfo :data="personalData" />
      </ProfileCard>
      <ProfileCard title="Activities" card-type="info" modification="replenished">
        <ProfileCardListComponent :data="activitiesData" />
      </ProfileCard>
      <ProfileCard title="Insurance info" card-type="info" modification="editable">
        <ProfileCardInfo :data="insuranceInfoData" />
      </ProfileCard>
      <ProfileCard title="Appointments" card-type="sheet" modification="replenished">
        <ProfileCardSheet :data="appointmentsData" :columns="[
          { field: 'date', header: 'Start time' },
          { field: 'speciality', header: 'Speciality' },
          { field: 'status', header: 'Status' },
        ]" />
      </ProfileCard>
      <ProfileCard title="Feedback" card-type="sheet" modification="replenished">
        <ProfileCardSheet :data="feedbackData" :columns="[
          { field: 'feedbackTitle', header: 'Case title' },
          { field: 'feedbackDate', header: 'Date' },
          { field: 'feedbackStatus', header: 'Status' },
        ]" />
      </ProfileCard>
      <ProfileCard title="Contact preferences" card-type="sheet">
        <ProfileCardSheet :data="contactMethodData" :columns="[
          { field: 'contactMethod', header: 'Contact Method' },
        ]" />
      </ProfileCard>
    </div>
  </section>
</template>

<style scoped>
.user-page {
  max-width: 1170px;
  box-shadow: 0px 4px 10px 0px #00000026;
  margin: 0 auto;
  background-color: #ffffff;
  border-radius: 10px;
}

.user-header {
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0px -1px 0px 0px #44444f1a inset;
  padding: 35px 30px 10px 30px;
}

.user-header__img {
  height: 81px;
  width: 81px;
  border-radius: 50%;
}

.user-header-info__title {
  font: 600 16px/24px "Poppins";
  padding-bottom: 3px;
  color: #171725;
}

.user-header-info__description {
  font: 400 12px/12px "Poppins";
  color: #92929d;
}

.user-body {
  height: 1000px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  padding: 35px;
}
</style>
