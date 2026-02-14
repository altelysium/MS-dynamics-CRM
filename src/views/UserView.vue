<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useProfileStore } from "../stores/profileStore";
import { computed, onMounted } from "vue";
import type { ContactInfoKeys, HeaderData, KeyValueRow, PersonalDataKeys, InsuranceInfoKeys } from "../types/profileTypes";
import ProfileCard from "../components/ProfileCard.vue";
import ProfileCardInfo from "../components/profileCardContent/ProfileCardInfo.vue";

const profileStore = useProfileStore();
const { selectedUserId, fetchedProfileData } = storeToRefs(profileStore);

const headerData = computed((): HeaderData => {
  return {
    imageSource: fetchedProfileData.value ? fetchedProfileData.value.image : "",
    fullName: `${fetchedProfileData.value?.firstName} ${fetchedProfileData.value?.lastName}`,
    department: fetchedProfileData.value ? fetchedProfileData.value.company.department : ""
  }
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
  }
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
  }
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
  }
});

onMounted(() => {
  profileStore.getProfileData(selectedUserId.value);
  console.log(fetchedProfileData.value);
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
      <ProfileCard title="Insurance info" card-type="info" modification="editable">
        <ProfileCardInfo :data="insuranceInfoData" />
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
  box-shadow: 0px -1px 0px 0px #44444F1A inset;
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
  color: #92929D;
}

.user-body {
  height: 900px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 20px;
  padding: 35px;
  
}
</style>
